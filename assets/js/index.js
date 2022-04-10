// 페이지 실행시, 동작해야하므로 즉시 실행 함수 사용
(async () => {
  // AJAX 요청,
  let json = null;

  // GET(READ) 요청한다.
  try {
    json = await axios.get(`http://localhost:3000/department`);
  } catch (e) {
    console.error(e);
    alert('요청을 처리하는데 실패했습니다.');
    return;
  }

  // AJAX 정상적으로 받아오면
  if (json != null) {
    const { data } = json;
    const listBody = document.querySelector('#listBody');

    // 동적으로 HTML 생성한다.
    data.forEach((v, i) => {
      const tr = document.createElement('tr');

      const td1 = document.createElement('td');
      td1.innerHTML = v.id;
      tr.appendChild(td1);

      const td2 = document.createElement('td');
      tr.appendChild(td2);

      const a1 = document.createElement('a');
      a1.setAttribute('href', `view.html?id=${v.id}`);
      a1.innerHTML = v.dname;
      td2.appendChild(a1);

      const td3 = document.createElement('td');
      td3.innerHTML = v.loc;
      tr.appendChild(td3);

      const td4 = document.createElement('td');
      tr.appendChild(td4);

      const a2 = document.createElement('a');
      a2.setAttribute('href', `edit.html?id=${v.id}`);
      a2.innerHTML = '수정';
      td4.appendChild(a2);

      const a3 = document.createElement('a');
      a3.setAttribute('href', '#');
      a3.dataset.id = v.id;
      a3.dataset.dname = v.dname;
      a3.innerHTML = '삭제';
      td4.appendChild(a3);

      listBody.appendChild(tr);

      // 삭제 버튼을 클릭하면
      a3.addEventListener('click', (e) => {
        e.preventDefault();

        const current = e.target;
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
          // 브라우저 화면에서도 삭제한다.
          current.closest('tr').remove();
        }
      });
    });
  }
})();
