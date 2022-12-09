import {
    Box,
    Button, Heading, HStack, Image, Modal, ModalBody,
    ModalCloseButton, ModalContent,
    ModalHeader, ModalOverlay, Text, useDisclosure,
    Tabs, TabList, TabPanels, Tab, TabPanel, Tag
} from '@chakra-ui/react'
import React from 'react'

export default function ModalLore({ name, lore, wallpaper, spells, sums, tags, title }) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button
                variant='outline'
                colorScheme='yellow'
                onClick={onOpen}
                display='block' mt={4}
                pos='absolute'
                zIndex={999}
            >
                Lore
            </Button>
            <Modal size='lg' isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg='#171717'>
                    <ModalHeader>{name} ~ {title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image
                            src={wallpaper}
                            alt='wal'
                            borderRadius={15}
                            mb={5}
                        />
                        <Text
                            textAlign='justify'
                        >
                            {lore}
                        </Text>

                        <Box mt={10}>
                            <Box my={4}>
                                <Heading size='md' my={5}>Roles</Heading>
                                {tags.map((item, key) => (
                                    <Tag key={key} mr={2}>{item}</Tag>
                                ))}
                            </Box>

                            <Box my={4}>
                                <Heading size='md' mb={5}>Abilities</Heading>
                                <Tabs variant='unstyled'>
                                    <TabList>
                                        {spells.map(({ spell }, key) => (
                                            <Tab key={key} _selected={{ transform: 'scale(1.3)' }}>
                                                <Image src={spell} alt='ok' borderRadius={10} />
                                            </Tab>
                                        ))}
                                    </TabList>
                                    <TabPanels>
                                        {spells.map(({ description, name, keyboard }, key) => (
                                            <TabPanel key={key}>
                                                <Heading size='sm' my={2}>{name} ({keyboard})</Heading>
                                                <Text textAlign='justify'>{description}</Text>
                                            </TabPanel>
                                        ))}
                                    </TabPanels>
                                </Tabs>
                            </Box>

                            <Box my={4}>
                                <Heading size='md'>Recommanded summoners spells</Heading>
                                <Text>{sums[1].name}</Text>
                                <Text>{sums[5].name}</Text>
                            </Box>

                            <Box my={4}>
                                <Heading size='md'>Recommanded core build</Heading>
                            </Box>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
