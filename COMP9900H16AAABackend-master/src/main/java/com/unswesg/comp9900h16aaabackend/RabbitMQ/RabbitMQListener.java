package com.unswesg.comp9900h16aaabackend.RabbitMQ;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
/**
@Component
public class RabbitMQListener {

    @RabbitListener(queues = "your_queue_name")
    public void receiveMessage(String message) {
        System.out.println("Received message: " + message);
    }
}*/