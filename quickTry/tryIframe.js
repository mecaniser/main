const doStuff = () => {
    let myIframe = document.getElementById("myIframe")
    let insideMyIframe = myIframe.contentWindow
    console.log(insideMyIframe, "Iframe name: " + insideMyIframe.name);
}