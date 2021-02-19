import React from "react";

function Elm({ children: child, flags, handlePorts }) {
    const createElmRef = React.useCallback((node) => {
        if (node === null) {
            return;
        }

        const elmPlaceholder = document.createElement("div");
        node.appendChild(elmPlaceholder);

        const app = child.init({
            node: elmPlaceholder,
            flags,
        });

        if (handlePorts !== undefined) {
            handlePorts(app.ports);
        }
    }, [child, flags, handlePorts]);

    return <div ref={createElmRef}/>
}

export default Elm;