const RemoteQuery = (function () {
        function createQuery (root) {
                const query = [root]
                const proxy = new Proxy (new Function (), {
                        get: function (target, prop) {
                                if (prop === 'toJSON') {
                                        return function () {return query}
                                }
                                query.push (prop)
                                return proxy
                        },
                        apply: function(target, thisArg, argumentsList) {
                                query.push (argumentsList)
                                return proxy
                        }
                })
                return proxy
        }
        return new Proxy ({}, {get: (target, prop) => createQuery (prop)})
}) ()
