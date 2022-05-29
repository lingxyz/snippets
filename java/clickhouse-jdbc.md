# clickhouse-jdbc

## clickhouse-jdbc 特点
- 可以使用clickhouse自带的fetch方法批量获取数据，避免大量数据加载到内存中引起内存溢出

## SpringBoot 集成 clickhouse-jdbc 示例

```xml
<!-- pom.xml -->
<dependency>
  <groupId>ru.yandex.clickhouse</groupId>
  <artifactId>clickhouse-jdbc</artifactId>
  <version>0.1.40</version>
</dependency>
```

```yml
# application.yml
clickhouse:
  address: jdbc:clickhouse://172.20.xxx.xxx:8123
  username: default
  password: xxx
  db: marketing
  socketTimeout: 600000
```

```java
/* 数据库连接操作util工具类 */
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import net.sf.json.JSONObject;
import ru.yandex.clickhouse.ClickHouseConnection;
import ru.yandex.clickhouse.ClickHouseDataSource;
import ru.yandex.clickhouse.settings.ClickHouseProperties;

import java.sql.*;
import java.util.*;

/**
 * @Auther: xxx
 * @Date: 2022/05/25 22:22
 * @Description:
 */
@Slf4j
@Component
public class ClickHouseUtil {
  private static String clickhouseAddress;
  private static String clickhouseUsername;
  private static String clickhousePassword;
  private static String clickhouseDB;
  private static Integer clickhouseSocketTimeout;

  @Value("${clickhouse.address}")
  public  void setClickhouseAddress(String address) {
    ClickHouseUtil.clickhouseAddress = address;
  }
  @Value("${clickhouse.username}")
  public  void setClickhouseUsername(String username) {
    ClickHouseUtil.clickhouseUsername = username;
  }
  @Value("${clickhouse.password}")
  public  void setClickhousePassword(String password) {
    ClickHouseUtil.clickhousePassword = password;
  }
  @Value("${clickhouse.db}")
  public  void setClickhouseDB(String db) {
    ClickHouseUtil.clickhouseDB = db;
  }
  @Value("${clickhouse.socketTimeout}")
  public  void setClickhouseSocketTimeout(Integer socketTimeout) {
    ClickHouseUtil.clickhouseSocketTimeout = socketTimeout;
  }

  public static Connection getConn() {
    ClickHouseConnection conn = null;
    ClickHouseProperties properties = new ClickHouseProperties();
    properties.setUser(clickhouseUsername);
    properties.setPassword(clickhousePassword);
    properties.setDatabase(clickhouseDB);
    properties.setSocketTimeout(clickhouseSocketTimeout);
    ClickHouseDataSource clickHouseDataSource = new ClickHouseDataSource(clickhouseAddress,properties);
    try {
      conn = clickHouseDataSource.getConnection();
      return conn;
    } catch (SQLException e) {
      e.printStackTrace();
    }

    return null;
  }

  public static List<JSONObject> exeSql(String sql){
    log.info("cliockhouse 执行sql：" + sql);
    Connection connection = getConn();
    try {
      Statement statement = connection.createStatement();
      ResultSet results = statement.executeQuery(sql);
      ResultSetMetaData rsmd = results.getMetaData();
      List<JSONObject> list = new ArrayList();
      while(results.next()){
        JSONObject row = new JSONObject();
        for(int i = 1;i<=rsmd.getColumnCount();i++){
          row.put(rsmd.getColumnName(i),results.getString(rsmd.getColumnName(i)));
        }
        list.add(row);
      }

      return list;
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return null;
  }

}
```

```java
/* 测试Clickhouse查询 */
import com.renrenche.databus.common.ClickHouseUtil;
import com.renrenche.databus.common.Result;
import com.renrenche.databus.domain.logdata.fem.FemParam;
import com.renrenche.databus.service.fem.FemMainService;
import net.sf.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

/**
 * @Auther: xxx
 * @Date: 2022/05/25 22:22
 * @Description:
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class SemTest {
  @Test
  public void getFrsDataTest(){
    System.out.println("******************");
    String sql="select * from marketing.sem_campaign_real_time_report";
    List<JSONObject> result= ClickHouseUtil.exeSql(sql);
    System.out.println("******************");
  }
}
```
