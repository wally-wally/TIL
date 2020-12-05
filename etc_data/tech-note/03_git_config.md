# git config (10/29)

<br>

- 전체 config 리스트 보기

```bash
git config --list
```

- git config 설정 (전역으로 설정할 때)

```bash
git config --global user.name "테스트"
git config --global user.email "test@test.com"
```

- git config 삭제

```bash
git config --unset user.name
git config --unset user.email
```

- global로 설정된 config 사용자를 지울 경우

```bash
git config --unset --global user.name
git config --unset --global user.email
```

<br>

---

:page_facing_up: <b>Reference</b>

- https://webisfree.com/2018-07-26/git-config-%EC%84%A4%EC%A0%95-%ED%99%95%EC%9D%B8-%EB%B0%8F-%EB%B3%80%EA%B2%BD%ED%95%98%EA%B8%B0
