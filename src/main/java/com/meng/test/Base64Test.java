package com.meng.test;

import org.apache.ws.commons.util.Base64;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.util.UUID;

/**
 * Created by meng on 2017/3/7.
 */
public class Base64Test {
    public static void main(String[] args) {
//        toBase64();
        uuid();
    }

    public static void uuid() {
        UUID uuid = UUID.randomUUID();
        System.out.println(uuid);
    }
    public static void toBase64(String[] args) {
        String filePath = "d:\\test.pcm";
        byte[] videoBytes;
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            FileInputStream fis = new FileInputStream(new File(filePath));
            byte[] buf = new byte[1024];
            int n;
            while (-1 != (n = fis.read(buf)))
                baos.write(buf, 0, n);
            videoBytes = baos.toByteArray();
            String video_str = Base64.encode(videoBytes);
            System.out.print("video array::" + video_str + "::");
        } catch (Exception e) {
        }
    }
}
