const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validarJWT");
const { httpUsarios } = require("../controllers/Usuarios");
const { usuarioHelper } = require("../helpers/Usuarios");
const { Router } = require("express")
const routers = Router()

const nodemailer = require('nodemailer');

// -----------------------------------------------------------------------------------------------------------------------------------
routers.get("/listarTodos",[
    validarCampos,
    // validarJWT
],httpUsarios.getUsuarios)

// routers.get("/listarPorUsuario",[
//     validarCampos,
// ])

// -------------------------------------------------------------------------------------------------------------------------------------
routers.post("/insertar",[
check('Email','El campo Email es obligatorio').notEmpty(),
check('Email').custom(usuarioHelper.existsEmail),
check('Password','El campo password es obligatorio').notEmpty(),
check('Password').custom(usuarioHelper.existePassword),
check('Password','La contraseña debe tener minimo 10 caracteres y maximo 15').isLength({min:10, max:15}),
check('Nombre','El campo es obligatorio').notEmpty(),
check('Nombre','El Nombre debe tener maximo 30 caracteres').isLength({max:30}),
validarCampos,
],httpUsarios.postUsuario)

// --------------------------------------------------------------------------------------------------------------------------------------
routers.post('/login',[
    check('Email','El campo email es obligatorio').notEmpty(),
    check('Email', 'El email no es correcto').isEmail(),
    check('Password','El campo de contraseña es obligatorio').notEmpty(),
    check('Password','La contraseña debe tener minimo 10 caracteres y maximo 15').isLength({min:10, max:15}),
    // check('Password').custom()
    validarCampos,
], httpUsarios.postLogin)

// // Ruta para solicitar recuperación de contraseña-----------------------------------------------------------------------------------------
// routers.post('/solicitar-recuperacion', [
//     // validarJWT
// ],httpUsarios.solicitarRecuperacionContrasena);

// // Ruta para restablecer la contraseña-----------------------------------------------------------------------------------------------------
// routers.post('/reset/:token', [
//     // validarJWT
// ],httpUsarios.restablecerContrasena);

// // -----------------------------------------------------------------------------------------------------------------------------------------
routers.put("/Actualizar/:id",[
    check('id','El id no es valido').isMongoId(),
    check('Email').custom(usuarioHelper.existsEmail),
    check('Email','El email no es correcto').isEmail(),
    check('Password').custom(usuarioHelper.existePassword),
    check('Password','La contraseña debe tener minimo 10 caracteres y maximo 15').isLength({min:10, max:15}),
    check('Nombre','El Nombre debe tener maximo 30 caracteres').isLength({max:30}),
    validarCampos,
    validarJWT
],httpUsarios.putUsuarioActualizar)

// --------------------------------------------------------------------------------------------------------------------------------------------
routers.put("/Activar/:id",[
    check('id','El no es valido').isMongoId(),
    validarCampos,
    validarJWT
],httpUsarios.putUsuarioActivar)

// -------------------------------------------------------------------------------------------------------------------------------------------
routers.put("/Desactivar/:id",[
    check('id','El id no es valido').isMongoId(),
    validarCampos,
    validarJWT
],httpUsarios.putUsuarioDesactivar)

// ------------------------------------------------------------------------------------------------------------------------------------------
routers.delete("/Eliminar/:id",[
    check('id','El id no es valido').isMongoId(),
    validarCampos,
    validarJWT
], httpUsarios.deleteUsario)

module.exports = routers