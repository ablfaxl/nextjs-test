import dynamic from "next/dynamic";

const Tasks = dynamic(() => import("../features/tasks/tasks"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Home() {
  return <Tasks />;
}
