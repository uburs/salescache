//parse xml
function getPostsProps(response, i) {
  const nsResolver = response.createNSResolver(response.ownerDocument == null ? response.documentElement : response.ownerDocument.documentElement);
  const url = response.evaluate('//item[' + i + ']/link', response, nsResolver, XPathResult.STRING_TYPE, null).stringValue;
  const title = response.evaluate('//item[' + i + ']/title', response, nsResolver, XPathResult.STRING_TYPE, null).stringValue;
  const imageNodeString = response.evaluate('//item[' + i + ']/description/node()', response, nsResolver, XPathResult.STRING_TYPE, null).stringValue
  const imageNode = new DOMParser().parseFromString(imageNodeString, "text/xml");
  const image = imageNode.evaluate('//div/img/@src', imageNode, nsResolver, XPathResult.STRING_TYPE, null).stringValue
  const post = {
    title: title,
    url: url,
    image: image
  }
  return post
}

//injects latest posts and amazon products
const getRecentPosts = function (response1) {
  const responsetest = new DOMParser().parseFromString(response1, "text/xml");
  var posts = [];
  for (var i = 1; i <= 3; i++) {
    posts[i - 1] = getPostsProps(responsetest, i)
  }
  return posts;
};