import React from "react";
import Elm from "./Elm";
import TestWrapper from "./Elm/Components/InteropTest.elm";
import "./style.css";

function createSimplePublisher() {
    const subscribers = [];
    return {
        send: (value) => {
            console.log("sending", value);
            subscribers.forEach(sub => sub(value));
        },
        subscribe: (sub) => {
            console.log("subscribing");
            subscribers.push(sub);
        }
    }
}

const label = "Fixed external value";
const initialForms = {
    label,
    message: "react",
    local: "elm",
}

const { InteropTest } = TestWrapper;
export function App() {
    const publisherRef = React.useRef(createSimplePublisher());
    const [value, setValue] = React.useState(initialForms.message);
    const [externalValue, setExternalValue] = React.useState(initialForms.local);

    const onChange = React.useCallback((event) => {
        const value = event.target.value;
        setValue(value);
    }, [setValue]);

    const onClick = React.useCallback(() => {
        publisherRef.current.send(value);
    }, [value]);

    const handlePorts = React.useCallback(({ messageReceiver, sendMessage }) => {
        publisherRef.current.subscribe((value) => {
            messageReceiver.send(value);
        });
        sendMessage.subscribe((message) => {
            setExternalValue(message);
        });
    }, [setExternalValue]);

    return (
        <div>
            <h2>React wrapper</h2>
            <div>Value from Elm component: <span className="message">{ externalValue }</span></div>
            <input
                type="text"
                placeholder="Type Here"
                value={value}
                onChange={onChange}
            />
            <button type="button" onClick={onClick}>Send value to Elm...?</button>
            <hr/>
            <br/>
            <h3>External Elm Component</h3>
            <Elm flags={initialForms} handlePorts={handlePorts}>
                {InteropTest}
            </Elm>
        </div>
    )
}