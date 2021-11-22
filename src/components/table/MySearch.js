const MySearch = (props) => {
    let input;
    const handleClick = () => {
        props.onSearch(input.value);
    };
    return (
        <div>
            <input
                placeholder={props.placeholder}
                className="search-button m-sm-1"
                ref={n => input = n}
                type="text"
                onChange={handleClick}
            />
        </div>
    );
};
export default MySearch;