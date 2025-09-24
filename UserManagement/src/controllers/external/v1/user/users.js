const getALlUsers = require("../../../../services/getAllUsers")

async function getAllUsers(_,res,next){
try {
    const users = await getALlUsers();
     const formattedUsers = users.map(user => ({
      name: [user.first_name, user.middle_name, user.last_name].filter(Boolean).join(' '),
      email: user.email,
      role: user.role,
      status: user.isActive ? 'Active' : 'Inactive',
      createdAt: user.createdAt
    }));
    return res.status(200).json({
        data: formattedUsers
    })
} catch (error) {
    next(error)
}
}

module.exports = getAllUsers