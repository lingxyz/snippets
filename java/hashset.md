# HashSet

## HashSet 特点
- HashSet继承自Set，特点是`无序、不可重复`。
- HashSet类似没有value的HashMap、不重复的 ArrayList。
- HashSet采用哈希算法实现。底层`基于HashMap实现`，是一个简化版的HashMap。
- `查询、增删效率较高`。`线程不安全`。

## HashSet 使用示例
```java
public class Test {
  public static void main(String[] args) {
    Set<String> s = new HashSet<String>();
    s.add("zero");
    s.add("zero"); // 相同元素不会插入
    s.add("null");
    s.add("null");
    System.out.println(s); // [null, zero]
  }
}
```

## HashSet 底层实现

```java
/* HashSet源码 */
public class HashSet<E> implements Set<E>, Cloneable, java.io.Serializable {
  private transient HashMap<E, Object> map;
  private static final Object PRESENT = new Object();
  // 构造方法
  public HashSet() {
    map = new HashMap<E, Object>();
  }
  // HashSet新增元素e，就是在HashMap中新增一条以e为key，空对象为value的数据。
  public boolean add(E e) {
    return map.put(e, PRESENT) == null;
  }
}
```
