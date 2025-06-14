import Image from "./components/Image";
import Simple from "./components/Simple";
import DynamicImage from "./components/DynamicImage";
import DynamicStyles from "./components/DynamicStyles";
import OptionalProps from "./components/OptionalProps";

export default function App() {
  return (
    <div className='app-container'>
      <h1> Explore various React components</h1>
      <Simple />
      <Image />
      <div className="demo-section">
        <h2>Dynamic Image Component</h2>
        <DynamicImage altText="dummy text" imageUrl="https://picsum.photos/id/237/200/300" />
      </div>

      <div className="demo-section">
        <h2>Dynamic Styles in a Component</h2>
        < DynamicStyles isActive={false} />
      </div>

      <div className="demo-section">
        <h2>Optional Props in a Component</h2>
        < OptionalProps age={34} name="kevin comba" />
      </div>

    </div>
  )
}
