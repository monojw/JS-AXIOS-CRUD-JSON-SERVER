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

    // 읽어온 값을 <dd>태그에 넣어준다.
    document.querySelector('.id').innerHTML = data.id;
    document.querySelector('.dname').innerHTML = data.dname;
    document.querySelector('.loc').innerHTML = data.loc;

    // 수정
    document
      .querySelector('.btn-edit')
      .setAttribute('href', `edit.html?id=${data.id}`);

    // 삭제
    const btnDelete = document.querySelector('.btn-delete');
    btnDelete.dataset.id = data.id;
    btnDelete.dataset.dname = data.dname;
  }
})();

// 삭제 버튼을 클릭하면
document.querySelector('.btn-delete').addEventListener('click', (e) => {
  e.preventDefault();

  const current = e.currentTarget;
  const id = current.dataset.id;
  const dname = current.dataset.dname;

  if (!confirm(`정말 ${dname}(을)를 삭제하시겠습니까?`)) {
    return;
  }

  // AJAX 요청,
  let json = null;

  // DELETE(DELETE) 요청한다.
  try {
    json = axios.delete(`http://localhost:3000/department/${id}`);
  } catch (e) {
    console.error(e);
    alert('요청을 처리하는데 실패했습니다.');
    return;
  }

  // AJAX 정상적으로 받아오면
  if (json != null) {
    // index 페이지로 이동한다.
    window.location = 'index.html';
  }
});
