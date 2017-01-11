package com.meng.test;

/**
 * Created by meng on 2016/8/13.
 */
public class Test {
    public static void main(String[] args) {
        String[] ss = new String[] {
            "1", "2", "3"
        };

        int[] ii = new int[] {
            2, 3, 5
        };

        for (int i = 0; i < ss.length; i++) {
            System.out.println(ss[i]);
            System.out.println(ss[i + 1]);
        }
    }
}
