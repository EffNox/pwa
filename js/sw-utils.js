function actualizaCacheDinamico(chDynamic, rq, rs) {
    if (rs.ok) {
        return caches.open(chDynamic).then(ch => {
            ch.put(rq, rs.clone());
            return rs.clone();
        });
    } else {
        return rs;
    }
}
