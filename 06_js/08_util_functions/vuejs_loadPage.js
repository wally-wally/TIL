// vue.js의 router.js에서 컴포넌트 불러올 때 code splitting을 적용시킬 때 사용하면 유용한 함수

function loadView(view) {
  return () => import (`@/views/${view}`)
}

function loadComponent(dirName, component) {
  return () => import (`@/components/${dirName}/${component}`)
}

export { loadView, loadComponent }