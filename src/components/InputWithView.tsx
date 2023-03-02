import React, {ChangeEventHandler, useState} from "react";

const InputWithView = () => {
    const [value, setValue] = useState<string>('');

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value)
    }

    return (
        <div>
            <input type="text" onChange={handleChange} />
            <span style={{ marginTop: 3 }}>{value}</span>
        </div>
    )
};

export default InputWithView;