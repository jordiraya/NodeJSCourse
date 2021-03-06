const users = [{
    id: 1,
    name: 'Andrew',
    schoolId: 101
}, {
    id: 2,
    name: 'Jessica',
    schoolId: 999   
}];

const grades = [{
    id: 1,
    schoolId: 101,
    grade: 86
}, {
    id: 2,
    schoolId: 999,
    grade: 100    
}, {
    id: 3,
    schoolId: 101,
    grade: 80
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id);
        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id of ${id}.`);
        }
    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId));
    });
};

// problem: two promises call, we don't have acces to user here
// const getStatus = (userId) => {
//     return getUser(userId).then((user) => {
//         return getGrades(user.schoolId);
//     }).then((grades) => {
//         // problem: two promises call, we don't have acces to user here
//         // solution: create var user
//     });
// };

const getStatus = (userId) => {
    var user;
    return getUser(userId).then((tmpUser) => {
        user = tmpUser;
        return getGrades(user.schoolId);
    }).then((grades) => {
        let average = 0;
        if (grades.length > 0) {
            average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
        }
        return `${user.name} has a ${average}% in the class`;
    });
};

// async await
// an async function return Promises automathically
// return a result is the same as resolving the Promise
// throwing an error is the same as rejecting the promise (throw new Error('...'));
// use await just before a Promise, always inside an async function
// if the Promise resolves, the result of the expression is the resolve of the promise
// if the Promise rejects, is the equivalent to throwing an error
getStatusAlt = async (userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);
    let average = 0;
    if (grades.length > 0) {
        average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }
    return `${user.name} has a ${average}% in the class`;
}

getStatusAlt(1).then((status) => {
    console.log('getStatusAlt -> ', status);
}).catch((e) => {
    console.log(e);
});

getUser(2).then((user) => {
    console.log('user -> ', user);
}).catch((e) => {
    console.log(e);
});

getGrades(101).then((grades) => {
    console.log('grades -> ', grades);
}).catch((e) => {
    console.log(e);
});

getStatus(1).then((status) => {
    console.log('status -> ', status);
}).catch((e) => {
    console.log(e);
});