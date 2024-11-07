import { createHashRouter } from "react-router-dom";
import Root from "./Root.tsx";
import Landing from "./Landing.tsx";
import Welcome from "./Welcome.tsx";

const router = createHashRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Landing />

            },
            {
                path: '/welcome',
                element: <Welcome />
            }
        ]
    }
])

export { router }