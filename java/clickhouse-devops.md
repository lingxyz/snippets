# ClickHouse DevOps

## 安装

```shell
# 添加yum源
yum-config-manager --add-repo http://repo.red-soft.biz/repos/clickhouse/repo/clickhouse-el6.repo

# 安装
yum install clickhouse-server clickhouse-client clickhouse-server-common clickhouse-compressor

# 启动服务
/etc/init.d/clickhouse-server start
```

## 登录测试

```shell
[root@VM_XXX_229_centos ~/tool]# clickhouse-client
ClickHouse client version 20.8.3.18.
Connecting to localhost:9000 as user default.
Connected to ClickHouse server version 20.8.3 revision 54438.

VM_XXX_229_centos :)
```

## 生产启动：进程守护？？？

## 生产备份：数据备份？？？

## 生产集群：容器？？？

## 生产分片：？？？