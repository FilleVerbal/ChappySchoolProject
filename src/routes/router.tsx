import { createHashRouter } from "react-router-dom";
import Root from "./Root.tsx";
import Landing from "./Landing.tsx";

const router = createHashRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Landing />

            }
        ]
    }
])

export { router }