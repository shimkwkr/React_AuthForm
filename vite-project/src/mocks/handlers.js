// src/mocks/handlers.js
import { HttpResponse, http } from "msw";
import userinfos from "./userinfos";

export const handlers = [
  // 회원가입
  http.post('/api/signup', async ({request}) => {
    const newUser = await request.json()
    userinfos.users.push(newUser)
    return HttpResponse.json({status: 201})
  }),

  // 로그인
  http.post('/api/login', async ({request}) => {
    const user = await request.json()
    const userInfo = userinfos.users.find((userInfo) => userInfo.id === user.id )
    
    if (!userInfo) {
      return HttpResponse.json({message: "사용자를 찾을 수 없습니다."}, {status: 404})
    }

    return HttpResponse.json({message: "사용자 검색 성공"}, {status: 200})
  }),

  // 로그아웃
  http.post('/api/logout', async ({request}) => {
    return HttpResponse.json({message: "로그아웃 성공"}, {status: 200})
  }),
  
  // 프로필 조회
  http.get('/api/profile/:id', async ({params}) => {
    const userInfo = userinfos.users.find((userInfo) => userInfo.id === params.id )
    return HttpResponse.json(userInfo, {status: 200})
  }),
];