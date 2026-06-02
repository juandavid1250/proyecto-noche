import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "scr"))

from scr.infraestructure.database import SessionLocal
from scr.domain.models import Rol, Usuarios


def main():
    print("Insertando datos de prueba...")

    db = SessionLocal()

    try:
        rol_existente = db.query(Rol).filter(Rol.nombre_rol == "Admin").first()
        if not rol_existente:
            rol = Rol(nombre_rol="Admin")
            db.add(rol)
            db.commit()
            print("✅ Rol 'Admin' insertado")
        else:
            print("ℹ️  Rol 'Admin' ya existe")

        usuario_existente = db.query(Usuarios).filter(Usuarios.correo == "admin@test.com").first()
        if not usuario_existente:
            rol = db.query(Rol).filter(Rol.nombre_rol == "Admin").first()
            usuario = Usuarios(
                id_rol=rol.id_rol,
                nombre_completo="Admin User",
                correo="admin@test.com",
                contrasena_hash="hashed_password_123"
            )
            db.add(usuario)
            db.commit()
            print("✅ Usuario de prueba insertado")
        else:
            print("ℹ️  Usuario ya existe")

        print("\n✅ Datos de prueba listos")
    finally:
        db.close()


if __name__ == "__main__":
    main()
