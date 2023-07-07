import Landing from "../components/Landing";
import Mission from "../components/Mission";
import Nintendo from "../components/Nintendo";
import Sony from "../components/Sony";
export default function Home() {
  return (
    <div className="Home">
      <Landing />
      <Mission />
      <Sony />
      <Nintendo />
    </div>
  );
}
