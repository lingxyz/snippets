package apis;

/**
 * Math类。用于数学计算。
 */
public class MathTest {
  public static void main(String[] args) {
    /* 求绝对值 */
    Math.abs(-100); // 100
    System.out.println("-100的绝对值：" + Math.abs(-100));

    /* 取最大/最小值 */
    Math.max(100, 1); // 100
    System.out.println("100与1最大值: " + Math.max(100, 1));

    Math.min(100, 1); // 1
    System.out.println("100与1最小值: " + Math.min(100, 1));

    /* 幂运算 */
    Math.pow(2, 10); // 2的10次方=1024
    System.out.println("2的10次方: " + Math.pow(2, 10));

    /* ex次方 */
    Math.exp(2); // 7.389...
    System.out.println("e的2次方: " + Math.exp(2));
    /* 平方根 √x */
    Math.sqrt(4); // 2
    System.out.println("√4: " + Math.sqrt(4));

    /* 以e为底的对数 */
    Math.log(4); // 1.386。e自然对数的底数。为无限不循环的常数。其值为2.71828。
    System.out.println("log e 4: " + Math.log(4));

    /* 以10为底的对数 */
    Math.log10(100); // 2
    System.out.println("log10(100): " + Math.log10(100));

    /* 三角函数 */
    Math.sin(3.14); // 0.00159
    // ...



  }

}