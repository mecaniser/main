function MyUIHandler() {
    xmui.XmUIHandler.call(this);
}
MyUIHandler.prototype = Object.create(xmui.XmUIHandler.prototype);
MyUIHandler.prototype.constructor = MyUIHandler;
MyUIHandler.prototype.startActivityIndicator = function (actionContext,
    clientContext) {
    var element = $("h1");
    element.text("Activity started");
    XmUIHandler.presentUI(element.get(0), clientContext);
}
7