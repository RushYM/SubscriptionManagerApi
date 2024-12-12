# 구독관리 서비스 API 

## 🌟 프로젝트 소개
구독관리 서비스를 위한 RESTful API 서버입니다.

## 🛠 기술 스택

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: TypeORM
- **Authentication**: JWT, Passport
- **API Documentation**: Swagger


### 환경 변수 설정
```plaintext
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=subscription_db
JWT_SECRET=your_jwt_secret
```


## 🔄 API 엔드포인트

### 사용자 관리
- POST `/users/signup` - 회원가입
- POST `/users/login` - 로그인

...more