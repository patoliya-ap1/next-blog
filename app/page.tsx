import HomeBlog from "./components/HomeBlog";
// import SanitizedContent from "./components/SanitizedContent";
export default function Home() {
  // const userGeneratedContent = `<img src="x" onerror="alert('XSS Attack!')" <b>Hello</b>`;

  return (
    <div>
      <HomeBlog />
      {/* <SanitizedContent htmlContent={userGeneratedContent} /> */}
    </div>
  );
}
