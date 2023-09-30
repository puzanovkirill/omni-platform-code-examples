import { Box, Flex, Text, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { TGroup } from '../../../domains/group';
import { ColorRound } from '../../../elements';

type TGroupRounds = {
  groups: TGroup[];
};

function GroupRounds({ groups }: TGroupRounds): JSX.Element {
  const { t } = useTranslation('pages');
  const background = useColorModeValue('white', 'gray.800');
  const btnColor = useColorModeValue('gray.300', 'gray.600');
  const color = useColorModeValue('gray.800', 'white');

  if (!groups.length) return <Text>—</Text>;

  let roundGroupsIds: TGroup[] = [];

  if (groups.length > 3) {
    roundGroupsIds = groups.slice(0, 3);
  } else {
    roundGroupsIds = groups;
  }

  const countOtherGroups = groups.length - roundGroupsIds.length;

  return (
    <Flex align="center">
      {roundGroupsIds.map((group, index) => (
        <Tooltip key={group.id} label={group.title}>
          <Box
            bg={background}
            pos="relative"
            right={index * 2}
            borderRadius="full"
            _notFirst={{
              pl: 1,
            }}
          >
            <ColorRound size={4} color={group.info.color} />
          </Box>
        </Tooltip>
      ))}
      {countOtherGroups > 0 && (
        <Tooltip
          label={t(`Profiles.ProfileInfo.MoreGroups`, { countOtherGroups })}
        >
          <Box
            pos="relative"
            right={6}
            pl={1}
            bg={background}
            borderRadius="full"
          >
            <Box
              color={color}
              textAlign="center"
              borderRadius="full"
              bg={btnColor}
              w={6}
              h={4}
              fontSize="xs"
              lineHeight={1}
            >
              . . .
            </Box>
          </Box>
        </Tooltip>
      )}
    </Flex>
  );
}

export default GroupRounds;
