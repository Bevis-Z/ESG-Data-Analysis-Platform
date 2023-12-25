package com.unswesg.comp9900h16aaabackend;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.unswesg.comp9900h16aaabackend.Mapper")
public class Comp9900H16AaaBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(Comp9900H16AaaBackendApplication.class, args);
    }

}
