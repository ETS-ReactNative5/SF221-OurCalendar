const characters = 'ab0cde1fghi2jklm3no4pq5r6st7uv8wx9yz';

export default function (length) {
    let res = '';
    for (let i = 0; i < length; i++ ) {
        res += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return res;
}
