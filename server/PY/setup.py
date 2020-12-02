from cx_Freeze import setup, Executable

executables = [Executable("server.py")]

setup(
    name="server",
    version="0.1",
    description="sNiffer!",
    options={
      "build_exe": {
        "include_files" : ["build/"],
        "build_exe": ".//dist",
        "packages": ["scapy"]
      }
    },
    executables=executables,
)