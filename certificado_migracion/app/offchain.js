NPP.onready = async () => {    
    PROVIDER.listAccounts().then(response => {
        for (let i = 0; i < MAX_USERS - 1; i++){
            // ADD FIVE STUDENTS
            NPP.addNewRecord({
                "txHash": "",
                "pubk": response[i],
                "degree": "Computer science",
                "titleExpeditionDate": "",
                "firstName": getName(),
                "firstSurname": getSurname(),
                "role": "1",
                "subjects": [
                    {
                        "Subject": "Computing Theory",
                        "Mark": toString(getRandomMark()),
                        "Subject Type": "Basic Core",
                        "Course": "23/24"
                    },
                    {
                        "Subject": "Calculus",
                        "Mark": toString(getRandomMark()),
                        "Subject Type": "Basic Core",
                        "Course": "23/24"
                    },
                    {
                        "Subject": "Bussiness Management",
                        "Mark": toString(getRandomMark()),
                        "Subject Type": "Basic Core",
                        "Course": "23/24"
                    },
                    {
                        "Subject": "Programming I",
                        "Mark": toString(getRandomMark()),
                        "Subject Type": "Basic Core",
                        "Course": "23/24"
                    },
                    {
                        "Subject": "Discrete Math",
                        "Mark": toString(getRandomMark()),
                        "Subject Type": "Basic Core",
                        "Course": "23/24"
                    },
                    {
                        "Subject": "Principles of Computer Engineering",
                        "Mark": "",
                        "Subject Type": "Basic Core",
                        "Course": "23/24"
                    },
                    {
                        "Subject": "Programming II",
                        "Mark": "",
                        "Subject Type": "Basic Core",
                        "Course": "23/24"
                    },
                    {
                        "Subject": "Linear Algebra",
                        "Mark": "",
                        "Subject Type": "Basic Core",
                        "Course": "23/24"
                    },
                    {
                        "Subject": "Physics",
                        "Mark": "",
                        "Subject Type": "Basic Core",
                        "Course": "23/24"
                    },
                    {
                        "Subject": "Statistics",
                        "Mark": "",
                        "Subject Type": "Basic Core",
                        "Course": "23/24"
                    }
                ]
            }).then(async function (cid) {
                const content = await NPP.node.dag.get(cid);
                console.log(content.value.payload);
            })
        }
        // ADD ADMIN (LAST USER)
        NPP.addNewRecord({
            "txHash": "",
            "pubk": response[MAX_USERS -1 ],
            "degree": "Computer science",
            "titleExpeditionDate": "",
            "firstName": getName(),
            "firstSurname": getSurname(),
            "role": "2",
            "subjects": []
        }).then(async function (cid) {
            const content = await NPP.node.dag.get(cid);
            console.log(content.value.payload);
        })
    });

}


NPP.create();