var studentsApi = {}
var BASE_API_PATH = "/api/v2";
module.exports = studentsApi;

/*INDICE PARA EL BUSCADOR. PULSAR CTR + F Y ESCRIBIR EL DIMINUTIVO A LA IZQUIERDA*/
/* 
#I1 -----> INSERCION INICIAL
#I2 -----> INICIALIZADOR 
#MP -----> METODOS PERMITIDOS
#GE -----> GETTERS
#BU -----> BÚSQUEDAS
#PP -----> POST Y PUT PERMITIDOS
#DE -----> DELETES
#MN -----> METODOS NO PERMITIDOS
#PU -----> PUTS NO PERMITIDOS
#PO -----> POST NO PERMITIDOS
*/



/*#I1------------------------------INSERCION INICIAL---------------------------*/
var initialStudents = [{ "province": "sevilla", "year": 2008, "gender": "male", "popilliterate": 16.32, "pophigheducation": 182.9, "popinuniversity": 30.493 },
    { "province": "cadiz", "year": 2008, "gender": "female", "popilliterate": 28.70, "pophigheducation": 97.06, "popinuniversity": 10.766 },
    { "province": "sevilla", "year": 2008, "gender": "both", "popilliterate": 56.53, "pophigheducation": 378.78, "popinuniversity": 66.325 },
    { "province": "granada", "year": 2010, "gender": "male", "popilliterate": 10.02, "pophigheducation": 81.99, "popinuniversity": 54.024 },
    { "province": "granada", "year": 2011, "gender": "female", "popilliterate": 23.86, "pophigheducation": 91.26, "popinuniversity": 22.905 },
    { "province": "granada", "year": 2011, "gender": "both", "popilliterate": 53.86, "pophigheducation": 191.26, "popinuniversity": 44.405 },

    { "province": "cordoba", "year": 2008, "gender": "male", "popilliterate": 16.32, "pophigheducation": 182.9, "popinuniversity": 30.493 },
    { "province": "jaen", "year": 2008, "gender": "female", "popilliterate": 28.70, "pophigheducation": 97.06, "popinuniversity": 10.766 },
    { "province": "almeria", "year": 2008, "gender": "both", "popilliterate": 56.53, "pophigheducation": 378.78, "popinuniversity": 66.325 },
    { "province": "huelva", "year": 2010, "gender": "male", "popilliterate": 10.02, "pophigheducation": 81.99, "popinuniversity": 54.024 },
    { "province": "huelva", "year": 2011, "gender": "female", "popilliterate": 23.86, "pophigheducation": 91.26, "popinuniversity": 22.905 },
    { "province": "huelva", "year": 2011, "gender": "both", "popilliterate": 53.86, "pophigheducation": 191.26, "popinuniversity": 44.405 },

    { "province": "malaga", "year": 2008, "gender": "male", "popilliterate": 16.32, "pophigheducation": 182.9, "popinuniversity": 30.493 },
    { "province": "malaga", "year": 2008, "gender": "female", "popilliterate": 28.70, "pophigheducation": 97.06, "popinuniversity": 10.766 },
    { "province": "huelva", "year": 2008, "gender": "both", "popilliterate": 56.53, "pophigheducation": 378.78, "popinuniversity": 66.325 },
    { "province": "sevilla", "year": 2010, "gender": "male", "popilliterate": 10.02, "pophigheducation": 81.99, "popinuniversity": 54.024 },
    { "province": "sevilla", "year": 2011, "gender": "female", "popilliterate": 23.86, "pophigheducation": 91.26, "popinuniversity": 22.905 },
    { "province": "sevilla", "year": 2011, "gender": "both", "popilliterate": 53.86, "pophigheducation": 191.26, "popinuniversity": 44.405 }

];

/*#I2------------------------------INICIALIZADOR---------------------------*/

studentsApi.register = function(app, db) {
    var ref = db.collection('students-an');
    
/*    function paginateQuery(db, limit) {
    // [START cursor_paginate]
    var first = ref
        .orderBy('popilliterate')
        .limit(limit);

    var paginate = first.get()
        .then((snapshot) => {
            // ...

            // Get the last document
            var last = snapshot.docs[snapshot.docs.length - 1];

            // Construct a new query starting at this document.
            // Note: this will not have the desired effect if multiple
            // cities have the exact same population value.
            var next = ref
                .orderBy('popilliterate')
                .startAfter(last.data().popilliterate)
                .limit(limit);

            // Use the query for pagination
            // [START_EXCLUDE]
            return next.get().then((snapshot) => {
                console.log('Num results:', snapshot.docs.length);
            });
            // [END_EXCLUDE]
        });
    // [END cursor_paginate]

    return paginate;
}

    console.log(paginateQuery(db,10))*/
    
    console.log("Registering router for students API...")
    app.get(BASE_API_PATH + "/students-an/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3891289/sos1718-08-students-an/RW1XKMBs");
    });

    //CARGAR DATOS INICIALES
    app.get(BASE_API_PATH + "/students-an/loadInitialData", (req, res) => {
        console.log("Load initial data");

        ref.get().then(function(snapshot) {
            var noexists = (snapshot._size == 0);
            if (noexists) {
                for (var i = 0; i < initialStudents.length; i++) {
                    var addDoc = ref.add(initialStudents[i]).then(ref => {
                        console.log('Added document with ID: ', ref.id);
                    });

                }
                res.sendStatus(201);
            }
            else {
                console.log("DB initialized");
                res.sendStatus(200);
            }

        });
    });

    /*#MP------------------------------METODOS PERMITIDOS---------------------------*/


    /*#GE-----------------------------------GETTERS---------------------------------*/

    //GET A TODOS LOS RECURSOS
    app.get(BASE_API_PATH + "/students-an", (req, res) => {
        console.log(Date() + " - GET /students-an");
        var limit = 0;
        if (req.query.limit != null) {
            var limit = parseInt(req.query.limit);
        }

        var offset = parseInt(req.query.offset);

        //BUSQUEDA
        var afrom = Number(req.query.from);
        var ato = Number(req.query.to);
        var year = Number(req.query.year);
        var province = req.query.province;
        var gender = req.query.gender;
        var popilliterate = Number(req.query.popilliterate);
        var pophigheducation = Number(req.query.pophigheducation);
        var popinuniversity = Number(req.query.popinuniversity);
        var respuesta = []



        if (afrom && ato) {
            var query = ref.orderBy('province').startAfter(afrom).endAt(ato).get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        //console.log(doc.id, '=>', doc.data());
                        respuesta.push(doc.data());

                    });
                    if (respuesta.length == 0) {
                        res.send([]);
                    }
                    else {
                        res.send(respuesta);
                    }

                })
                .catch(err => {
                    console.log('Error getting documents', err);
                    res.sendStatus(500);
                });

        }
        else {
            if (gender) {
                var query = ref.where('gender', '==', gender).orderBy('year').startAfter(offset).limit(limit).get()
                    .then(snapshot => {
                        snapshot.forEach(doc => {
                            //console.log(doc.id, '=>', doc.data());
                            respuesta.push(doc.data());

                        });
                        if (respuesta.length == 0) {
                            res.send([]);
                        }
                        else {
                            res.send(respuesta);
                        }

                    })
                    .catch(err => {
                        console.log('Error getting documents', err);
                        res.sendStatus(500);
                    });
            }
            else {
                if (province) {
                    var query = ref.where('province', '==', province).orderBy('year').startAfter(offset).limit(limit).get()
                        .then(snapshot => {
                            snapshot.forEach(doc => {
                                //console.log(doc.id, '=>', doc.data());
                                respuesta.push(doc.data());

                            });
                            if (respuesta.length == 0) {
                                res.send([]);
                            }
                            else {
                                res.send(respuesta);
                            }

                        })
                        .catch(err => {
                            console.log('Error getting documents', err);
                            res.sendStatus(500);
                        });
                }
                else {
                    if (year) {
                        var query = ref.where('year', '==', year).orderBy('year').startAfter(offset).limit(limit).get()
                            .then(snapshot => {
                                snapshot.forEach(doc => {
                                    //console.log(doc.id, '=>', doc.data());
                                    respuesta.push(doc.data());

                                });
                                if (respuesta.length == 0) {
                                    res.send([]);
                                }
                                else {
                                    res.send(respuesta);
                                }

                            })
                            .catch(err => {
                                console.log('Error getting documents', err);
                                res.sendStatus(500);
                            });
                    }
                    else {
                        if (popilliterate) {
                            var query = ref.where('popilliterate', '==', popilliterate).orderBy('year').startAfter(offset).limit(limit).get()
                                .then(snapshot => {
                                    snapshot.forEach(doc => {
                                        //console.log(doc.id, '=>', doc.data());
                                        respuesta.push(doc.data());

                                    });
                                    if (respuesta.length == 0) {
                                        res.send([]);
                                    }
                                    else {
                                        res.send(respuesta);
                                    }

                                })
                                .catch(err => {
                                    console.log('Error getting documents', err);
                                    res.sendStatus(500);
                                });
                        }
                    }
                    if (pophigheducation) {
                        var query = ref.where('pophigheducation', '==', pophigheducation).orderBy('year').startAfter(offset).limit(limit).get()
                            .then(snapshot => {
                                snapshot.forEach(doc => {
                                   // console.log(doc.id, '=>', doc.data());
                                    respuesta.push(doc.data());

                                });
                                if (respuesta.length == 0) {
                                    res.send([]);
                                }
                                else {
                                    res.send(respuesta);
                                }

                            })
                            .catch(err => {
                                console.log('Error getting documents', err);
                                res.sendStatus(500);
                            });
                    }
                    else {
                        if (popinuniversity) {
                            var query = ref.where('popinuniversity', '==', popinuniversity).orderBy('year').startAfter(offset).limit(limit).get()
                                .then(snapshot => {
                                    snapshot.forEach(doc => {
                                        //console.log(doc.id, '=>', doc.data());
                                        respuesta.push(doc.data());

                                    });
                                    if (respuesta.length == 0) {
                                        res.send([]);
                                    }
                                    else {
                                        res.send(respuesta);
                                    }

                                })
                                .catch(err => {
                                    console.log('Error getting documents', err);
                                    res.sendStatus(500);
                                });
                        }
                        else {
                            var cont=0;
                            var limite=0;
                            var query = ref.orderBy('province').get()
                                .then(snapshot => {
                                    var last = snapshot.docs[snapshot.docs.length - 1];
                                    snapshot.forEach(doc => {
                                       // console.log(doc.id, '=>', doc.data());
                                       if(cont>=offset && limite < limit){
                                        respuesta.push(doc.data());
                                        limite +=1;
                                       }
                                       cont+=1;

                                    });
                                    if (respuesta.length == 0) {
                                        res.send([]);
                                    }
                                    else {
                                        res.send(respuesta);
                                    }

                                })
                                .catch(err => {
                                    console.log('Error getting documents', err);
                                    res.sendStatus(500);
                                });
                        }
                    }
                }
            }
        }





    });

    //GET A UN SUBCONJUNTO DE RECURSOS
    app.get(BASE_API_PATH + "/students-an/:province", (req, res) => {
        var limit = 0;
        if (req.query.limit != null) {
            var limit = parseInt(req.query.limit);
        }
        var offset = parseInt(req.query.offset);
        var province = String(req.params.province);

        var respuesta = []
        var query = ref.where('province', '==', province).orderBy('year').startAfter(offset).limit(limit).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    //console.log(doc.id, '=>', doc.data());
                    respuesta.push(doc.data());

                });
                if (respuesta.length == 0) {
                    res.sendStatus(404);
                }
                else {
                    res.send(respuesta);
                }

            })
            .catch(err => {
                console.log('Error getting documents', err);
                res.sendStatus(500);
            });
    });

    //GET A UN SUBCONJUNTO DE RECURSOS
    app.get(BASE_API_PATH + "/students-an/:province/:year", (req, res) => {
        var limit = 0;
        if (req.query.limit != null) {
            var limit = parseInt(req.query.limit);
        }
        var offset = parseInt(req.query.offset);
        var province = String(req.params.province);
        var year = Number(req.params.year);

        var respuesta = []
        var query = ref.where('province', '==', province).where('year', '==', year).orderBy('gender').startAfter(offset).limit(limit).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    //console.log(doc.id, '=>', doc.data());
                    respuesta.push(doc.data());

                });
                if (respuesta.length == 0) {
                    res.sendStatus(404);
                }
                else {
                    res.send(respuesta);
                }

            })
            .catch(err => {
                console.log('Error getting documents', err);
                res.sendStatus(500);
            });
    });

    //GET A UN RECURSO CONCRETO
    app.get(BASE_API_PATH + "/students-an/:province/:year/:gender", (req, res) => {
        var limit = 0;
        if (req.query.limit != null) {
            var limit = parseInt(req.query.limit);
        }
        var offset = parseInt(req.query.offset);
        var province = String(req.params.province);
        var year = parseInt(req.params.year);
        var gender = req.params.gender;

        var respuesta = []
        var query = ref.where('province', '==', province).where('year', '==', year).where('gender', '==', gender).orderBy('popilliterate').startAfter(offset).limit(limit).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    console.log(doc.id, '=>', doc.data());
                    respuesta.push(doc.data());

                });
                if (respuesta.length == 0) {
                    res.sendStatus(404);
                }
                else {
                    res.send(respuesta);
                }

            })
            .catch(err => {
                console.log('Error getting documents', err);
                res.sendStatus(500);
            });
    });

    /*#PP------------------------------POST Y PUT PERMITIDOS---------------------------*/

    //CREAR UN NUEVO RECURSO
    app.post(BASE_API_PATH + "/students-an", (req, res) => {
        console.log(Date() + " - POST /students-an");
        var student = req.body;

        if (student.province == null || student.year == null || student.gender == null) {
            console.error("Invalid fields");
            res.sendStatus(400);
            return;
        }

        ref.where('province', '==', student.province).where('year', '==', student.year).where('gender', '==', student.gender).get().then(function(snapshot) {
            var noexists = (snapshot._size == 0);
            if (noexists) {

                var addDoc = ref.add(student).then(ref => {
                    console.log('Added document with ID: ', ref.id);
                });


                res.sendStatus(201);
            }
            else {
                console.log("The resource already exists");
                res.sendStatus(409);
            }

        });

    });

    //ACTUALIZAR UN RECURSO CONCRETO
    app.put(BASE_API_PATH + "/students-an/:province/:year/:gender", (req, res) => {
        var provincep = req.params.province;
        var yearp = Number(req.params.year)
        var genderp = req.params.gender
        var student = req.body;

        console.log(Date() + " - PUT /students-an/" + provincep + "/" + yearp + "/" + genderp);

        if (provincep != student.province || yearp != student.year || genderp != student.gender || isNaN(student.popilliterate) ||
            isNaN(student.pophigheducation) || isNaN(student.popinuniversity)) {
            res.sendStatus(400);
            console.warn(Date() + "Invalid fields");
            return;
        }
        var query = ref.where('province', '==', provincep).where('year', '==', yearp).where('gender', '==', genderp).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    console.log("Este es el doc" + doc.id)
                    ref.doc(doc.id).update({
                        province: student.province,
                        year: student.year,
                        gender: student.gender,
                        popilliterate: student.popilliterate,
                        pophigheducation: student.pophigheducation,
                        popinuniversity: student.popinuniversity
                    });
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
        res.sendStatus(200);
    });

    /*#DE------------------------------DELETES---------------------------*/

    //Borrar todos los recursos
    app.delete(BASE_API_PATH + "/students-an", (req, res) => {
        console.log(Date() + " - DELETE /students-an");

        var deleteDoc = ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                ref.doc(doc.id).delete();
            })
        })

        res.sendStatus(200);
        
    });

    //Borrar un subconjunto de recursos
    app.delete(BASE_API_PATH + "/students-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - DELETE /students-an/" + province);

        var deleteDoc = ref.where('province', '==', province).get().then(snapshot => {
            snapshot.forEach(doc => {
                ref.doc(doc.id).delete();
            })
        })

        res.sendStatus(200);
    });

    //Borrar un subconjunto de recursos
    app.delete(BASE_API_PATH + "/students-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = Number(req.params.year);
        console.log(Date() + " - DELETE /students-an/" + province + "/" + year)

        var deleteDoc = ref.where('province', '==', province).where('year', '==', year).get().then(snapshot => {
            snapshot.forEach(doc => {
                ref.doc(doc.id).delete();
            })
        })

        res.sendStatus(200);
    });

    //Borrar un recurso concreto
    app.delete(BASE_API_PATH + "/students-an/:province/:year/:gender", (req, res) => {
        var province = req.params.province;
        var year = Number(req.params.year);
        var gender = req.params.gender;
        console.log(Date() + " - DELETE /students-an/" + province + "/" + year + "/" + gender);

        var deleteDoc = ref.where('province', '==', province).where('year', '==', year).where('gender','==',gender).get().then(snapshot => {
            snapshot.forEach(doc => {
                ref.doc(doc.id).delete();
            })
        })

        res.sendStatus(200);
    });

    /*#MN------------------------------METODOS NO PERMITIDOS---------------------------*/

    /*#PU------------------------------PUTS---------------------------*/

    app.put(BASE_API_PATH + "/students-an", (req, res) => {
        console.log(Date() + " - PUT /students-an");
        res.sendStatus(405);
    });

    app.put(BASE_API_PATH + "/students-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - PUT /students-an/" + province);

        res.sendStatus(405);
    });

    app.put(BASE_API_PATH + "/students-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = Number(req.params.year);
        console.log(Date() + " - PUT /students-an/" + province + "/" + year);

        res.sendStatus(405);
    });

    /*#PO------------------------------POSTS---------------------------*/


    app.post(BASE_API_PATH + "/students-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - POST /students-an/" + province);
        res.sendStatus(405);
    });

    app.post(BASE_API_PATH + "/students-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = Number(req.params.year);
        console.log(Date() + " - POST /students-an/" + province + "/" + year);
        res.sendStatus(405);
    });

    app.post(BASE_API_PATH + "/students-an/:province/:year/:gender", (req, res) => {
        var province = req.params.province;
        var year = Number(req.params.year);
        var gender = req.params.gender;
        console.log(Date() + " - POST /students-an/" + province + "/" + year + "/" + gender);
        res.sendStatus(405);
    });
};
