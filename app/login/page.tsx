export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center p-16">
      <h1>sign up page</h1>
      <form>
        {/* <form action={}> */}
        <p>username</p>
        <input placeholder="username" name="username"></input>
        <p>password</p>
        <input placeholder="password" name="password"></input>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}
