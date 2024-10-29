import { Outlet } from "react-router-dom";

function Root() {
	return (
		<div>
			{/* aria-hidden means that the element is not visible to the screenreading-..uh.. thing */}
			<section className="mainContent" aria-hidden></section>
			<Outlet />
		</div>
	);
}
export default Root;