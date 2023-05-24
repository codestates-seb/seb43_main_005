FROM openjdk:11
ARG JAR_FILE=build/libs/app.jar
COPY ${JAR_FILE} ./app.jar
ENV TZ =Asia/Seoul
ENTRYPOINT ["java", "-Dspring.profiles.active=server", "-jar", "./app.jar"]
