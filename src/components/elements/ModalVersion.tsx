import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@heroui/react';
import { Link } from 'react-router-dom';

export default function ModalVersion() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Select Version
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-center gap-2">
                  <Button color="primary" to="/v1" as={Link}>
                    V1
                  </Button>
                  <Button color="primary" to="/v2" as={Link}>
                    V2
                  </Button>
                  <Button color="primary" to="/v3" as={Link}>
                    V3
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" to="/" as={Link}>
                  Hone
                </Button>
              </ModalFooter>
            </>
          }
        </ModalContent>
      </Modal>
    </>
  );
}
