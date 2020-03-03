import fetch from 'isomorphic-unfetch'
import Button from '@material-ui/core/Button';

const API_URL = 'https://private-cf0fb-yudacogati.apiary-mock.com/sample/items/'

const PostsEdit = (article) => {
  const saveData = () => {
    alert('saved!')
  }
  return (
    <div>
      <h1>My blog post #{article.id}</h1>
      <form>
        <div>
          <label>Phone</label>
          <input type="text" name="phone" defaultValue={article.phone} />
        </div>
        <div>
          <label>Nominal</label>
          <input type="number" name="nominal" defaultValue={article.nominal} />
        </div>
        <div>
          <label>Note</label>
          <textarea name="note" defaultValue={article.note}></textarea>
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={saveData}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

PostsEdit.getInitialProps = async ({ query }) => {
  const id = query.id
  const res = await fetch(API_URL + id, {
    headers: {
      'Authorization': 'Bearer ABCDEF',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  const json = await res.json()
  return json.data
}

export default PostsEdit
