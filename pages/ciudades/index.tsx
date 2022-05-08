import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Button,
  FormLabel,
  Input,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  ModalFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { CiudadesService } from "@/services/ciudades.service";
import { ICiudad } from "@/services/api.models";

function CiudadesListado() {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenedit,
    onOpen: onOpenedit,
    onClose: onCloseedit,
  } = useDisclosure();


  const [nombreServicio, setNombreServicio] = useState("");

  const [nombreServicioEdit, setNombreServicioEdit] = useState("");
  const [servicioEdit, setServicioEdit] = useState<ICiudad>();

  const [cargando, setCargando] = useState(false);

  const guardarServicio = async () => {
    const data: ICiudad = {
      nombre: nombreServicio,
    };

    const ciudad = new CiudadesService()
    const response = await ciudad.create(data)



    if (response.status === 201) {
      onClose();
      setNombreServicio("");
      toast({
        title: "Ciudad Nueva Agregada con Exito.",
        description: "La ciudad se Agrego con Exito.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Oops.. Algo salio mal",
        description: response.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  /*CONSULTA EN TABLA DE Ciudades*/

  const [listadoCiudades, setListadoServicios] = useState<ICiudad[]>([]);

  useEffect(() => {
    const consultarServicios = async () => {
      const service = new CiudadesService();
      const respuesta = await service.getAll();
      const data = respuesta.data as ICiudad[];

      if (respuesta.status == 200) {
        setListadoServicios(data);
      } else {
        console.log(respuesta);
      }
    };

    consultarServicios();
  }, []);

  return (
    <DesktopLayout>
      <Header title={"Lista de ciudades "} />
      <Box
        m={2}
        bgColor="white"
        padding={5}
        borderRadius={10}
        boxShadow="2xl"
        p="6"
        rounded="md"
        bg="white"
      >
        <Box
          m={2}
          bgColor="white"
          padding={5}
          borderRadius={10}
          p="6"
          rounded="md"
          bg="white"
        >
          {" "}
          <Button
            onClick={onOpen}
            leftIcon={<AddIcon />}
            colorScheme="facebook"
            variant="solid"
            marginLeft={"80%"}
          >
            Agregar Nueva Ciudad
          </Button>
        </Box>
        <Box marginLeft={"1%"}>
          <TableContainer>
            <Table size={"md"} variant="simple" colorScheme="teal">
              <TableCaption>Ciudades</TableCaption>
              <Thead>
                <Tr>
                  <Th>Nombre</Th>
                  <Th>Opciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {listadoCiudades.length != 0 ? (
                  listadoCiudades.map((serv, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{serv.nombre}</Td>
                        <Td>
                          <IconButton
                            onClick={() => {
                              onOpenedit();
                              setServicioEdit(serv);
                            }}
                            variant="ghost"
                            aria-label="edit"
                            icon={<EditIcon />}
                          />{" "}
                          <IconButton
                            variant="ghost"
                            aria-label="delet"
                            colorScheme={"red"}
                            icon={<DeleteIcon color={"red"} />}
                          />
                        </Td>
                      </Tr>
                    );
                  })
                ) : (
                  <Tr>
                    <Td>No hay data</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar una Nueva Ciudad</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel padding={1}>Nombre de la Ciudad</FormLabel>
              <Input
                paddingBottom={2}
                placeholder="Nombre"
                onChange={(e) => {
                  setNombreServicio(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>




            <Button colorScheme="blue" mr={3} onClick={guardarServicio}>
              Guardar
            </Button>


            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpenedit}
        onClose={onCloseedit}
      >
        <ModalOverlay />
        <ModalContent>
          {/* MODAL PARA EDITAR CIUDAD */}
          <ModalHeader>Editar Ciudad</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Nombre del la Ciudad</FormLabel>
              <Input
                placeholder="Nombre"
                onChange={(e) => {
                  //setNombreServicio(e.target.value)
                  alert("Hola");
                }}
              />
            </FormControl>
          
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={cargando}
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setCargando(true);
                const data: ICiudad = {
                  nombre: nombreServicioEdit,
                };

                const ciudad = new CiudadesService();
                const respuesta = ciudad.update(data, servicioEdit?.id || 0);

                console.log(data);
                setCargando(false);
                onCloseedit();
              }}
            >
              Guardar
            </Button>
            <Button onClick={onCloseedit}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DesktopLayout>
  );
}

export default CiudadesListado;
