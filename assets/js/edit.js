// 페이지 실행시, 동작해야하므로 즉시 실행 함수 사용
(async () => {
  // 파라미터에서 id값을 가져온다.
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    alert('학과번호가 없습니다');
    history.back();
    return;
  }

  // AJAX 요청,
  let json = null;

  // GET(READ) 요청한다.
  try {
    json = await axios.get(`http://localhost:3000/department/${id}`);
  } catch (e) {
    console.error(e);
    alert('요청을 처리하는데 실패했습니다.');
    return;
  }

  // AJAX 정상적으로 받아오면
  if (json != null) {
    const { data } = json;

    // 읽어온 값을 <input>태그에 넣어준다.
    document.querySelector('#id').value = data.id;
    document.querySelector('#dname').value = data.dname;
    document.querySelector('#loc').value = data.loc;
  }
})();

// form을 submit하면
document.querySelector('#department-form').addEventListener('submit', (e) => {
  e.preventDefault();

  //input 태그 값을 가져온다.
  const id = document.querySelector('#id').value;
  const dname = document.querySelector('#dname').value;
  const loc = document.querySelector('#loc').value;

  // AJAX 요청,
  let json = null;

  // PUT(UPDATE) 요청한다.
  try {
    json = axios.put(`http://localhost:3000/department/${id}`, {
      dname,
      loc,
    });
  } catch (e) {
    console.error(e);
    alert('요청을 처리하는데 실패했습니다.');
    return;
  }
  // AJAX 정상적으로 받아오면
  if (json != null) {
    // view 페이지로 이동한다.
    window.location = `view.html?id=${id}`;
  }
});
