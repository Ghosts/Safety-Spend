import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Tooltip,
  IconButton,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Link,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { BiInfoCircle } from "react-icons/bi";

export const InfoModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip label="Info" fontSize="sm">
        <IconButton
          colorScheme="blue"
          onClick={onOpen}
          variant="ghost"
          aria-label="Info"
          icon={<Icon boxSize="1.5em" as={BiInfoCircle} />}
        />
      </Tooltip>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Week is an open-sourced budgeting app designed to break down
            finances on a per-week level so you always know how much you have to
            spend.
            <Divider mt="15px" mb="5px" />
            <Link isExternal href="https://github.com/Ghosts/week">
              GitHub <ExternalLinkIcon mx="2px" />
            </Link>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
