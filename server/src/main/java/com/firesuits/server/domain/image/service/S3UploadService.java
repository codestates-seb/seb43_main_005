package com.firesuits.server.domain.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class S3UploadService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;

    public String upload(MultipartFile multipartFile) throws IOException {
        String s3FileName = UUID.randomUUID() + "_" + multipartFile.getOriginalFilename();

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFile.getInputStream().available());
        objectMetadata.setContentDisposition("inline"); // 이미지를 인라인으로 표시하도록 지시
        objectMetadata.setContentType(multipartFile.getContentType()); // 이미지의 콘텐츠 타입 설정

        amazonS3.putObject(bucket, s3FileName, multipartFile.getInputStream(), objectMetadata);

        return amazonS3.getUrl(bucket, s3FileName).toString();
    }
}
