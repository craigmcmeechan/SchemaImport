jsPlumb.ready(function() {

    jsPlumb.Defaults.Connector = ["Flowchart", {
        stub: [40, 60],
        gap: 10,
        cornerRadius: 5,
        alwaysRespectStubs: true
    }];
    jsPlumb.Defaults.HoverPaintStyle = {
        strokeStyle: "#637b94",
        lineWidth: 6
    };
    jsPlumb.Defaults.EndpointHoverStyle = {
        fillStyle: "#637b94"
    };

    var instance = jsPlumb.importDefaults({
        ConnectionsDetachable: true,
        DragOptions: {
            cursor: 'pointer',
            zIndex: 2000
        },
        PaintStyle: {
            strokeStyle: '#666',
            lineWidth: 2,
            joinstyle: "round",
        },
        Anchors: ["TopCenter", "TopCenter"],
        endpointStyle: {
            fillStyle: "yellow"
        }

    });
    instance.doWhileSuspended(function() {
        // bind to connection/connectionDetached events, and update the list of connections on screen.
        instance.bind("connection", function(info, originalEvent) {
            //console.log(info.connection.getParameters());
        });

        instance.bind("connectionDetached", function(info, originalEvent) {
            //todo: refactor
            //console.log(info.connection.getParameter("relation"))
            var relation = info.connection.getParameter("relation");
            //console.log(relation);

            if (relation) {
              //  console.log(info);
                relation.set("conn", "");
                relation.destroy();
            }


            //return false;
            //console.log(info.connection.getParameter("view").model);
            //info.connection.getParameter("view").model.destroy();
        });

        instance.bind("beforeDrop", function(connection) {
            console.log(connection);
            if (connection.sourceId !== connection.targetId) {
                var node = connection.connection.getParameter("node");
                DesignerApp.execute("nodecanvas:create:relation", node, connection.targetId);
            }

            //console.log(getTableContainerFromNodeCid(connection.sourceId));
            //console.log(getTableContainerFromNodeCid(connection.targetId));

            return false;
        });
    });
    DesignerApp.execute("draw:relation:model");
    MightyBits.newFile();
});