
function DynamicStyles({ isActive }: { isActive?: boolean }) {
    // Default value for isActive if not provided
    const style = {
        color: isActive ? 'green' : 'red',
        fontSize: '20px'
    };
    return <h1 style={style}>Styled Text</h1>;
}

export default DynamicStyles