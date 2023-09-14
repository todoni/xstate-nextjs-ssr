type Props = {
    value: string;
    onClick: () => void;
};

function Continent(props: Props) {
    const { value, onClick } = props;

    return (
        <li>
            {value}
            <button onClick={onClick}>View countries</button>
        </li>
    );
}

export default Continent;
