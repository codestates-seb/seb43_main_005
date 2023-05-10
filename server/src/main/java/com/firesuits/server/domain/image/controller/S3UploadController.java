package com.firesuits.server.domain.image.controller;

import com.firesuits.server.domain.image.service.S3UploadService;
import com.firesuits.server.global.error.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
public class S3UploadController {

    private final S3UploadService s3Upload;

    @PostMapping("/upload")
    public Response<String> uploadFile(@RequestParam("images")MultipartFile multipartFile) throws IOException{
        String url = s3Upload.upload(multipartFile);
        return Response.success(url);
    }
}
