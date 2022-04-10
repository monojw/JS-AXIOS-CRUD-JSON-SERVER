// form을 submit하면
document
  .querySelector('#department-form')
  .addEventListener('submit', async (e) => {
    e.preventDefault();
    //input 태그 값을 가져온다.
    const dname = document.querySelector('#dname').value;
    const loc = document.querySelector('#loc').value;

    // AJAX 요청,
    let json = null;

    // POST(CREATE) 요청한다.
    try {
      json = await axios.post(`http://localhost:3000/department`, {
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
      const { data } = json;

      // view 페이지로 이동한다.
      window.location = `view.html?id=${data.id}`;
    }
  });
