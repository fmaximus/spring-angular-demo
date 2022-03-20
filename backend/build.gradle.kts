import org.asciidoctor.gradle.jvm.AsciidoctorTask

plugins {
    java
    `java-library`
    id("org.springframework.boot") version "2.6.4"
    id("io.spring.dependency-management") version "1.0.11.RELEASE"
    id("org.asciidoctor.jvm.convert") version "3.3.2"
    id("com.gorylenko.gradle-git-properties") version "2.3.2"
}

group = "com.awakenedsoftware"
version = "0.0.1-SNAPSHOT"

configure<JavaPluginExtension> {
    sourceCompatibility = JavaVersion.VERSION_17
}

configurations {
    "compileOnly" {
        extendsFrom(configurations["annotationProcessor"])
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-r2dbc")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    //implementation("org.springframework.boot:spring-boot-starter-hateoas")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-webflux")
    implementation("org.flywaydb:flyway-core")
    implementation("org.springframework:spring-jdbc")
    implementation("org.springframework.session:spring-session-core")

    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")

    runtimeOnly("io.r2dbc:r2dbc-postgresql")
    runtimeOnly("org.postgresql:postgresql")
    runtimeOnly("org.springframework.boot:spring-boot-devtools")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("io.projectreactor:reactor-test")
    testImplementation("org.springframework.security:spring-security-test")
    testImplementation("org.testcontainers:junit-jupiter")
    testImplementation("org.testcontainers:postgresql")
    testImplementation("org.testcontainers:r2dbc")
    testImplementation("org.springframework.restdocs:spring-restdocs-webtestclient")
}

dependencyManagement {
    val testcontainersVersion = "1.16.2"
    imports {
        mavenBom("org.testcontainers:testcontainers-bom:${testcontainersVersion}")
    }
}


tasks.named<Test>("test") {

    useJUnitPlatform()
}

tasks {
    asciidoctor {
        sourceDir("src/doc/asciidoc")
        attributes(mapOf("snippets" to file("build/snippets")))
    }
}